// Diagnostic utilities for debugging link ordering issues

import { prisma } from "@/lib/prisma";

/**
 * Checks for ordering inconsistencies in the database
 */
export async function diagnoseLinkOrderingIssues(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        links: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!profile) {
      return { error: "Profile not found" };
    }

    const issues = [];
    const orders = profile.links.map((link) => link.order);

    // Check for duplicate orders
    const duplicates = orders.filter(
      (order, index) => orders.indexOf(order) !== index
    );
    if (duplicates.length > 0) {
      issues.push({
        type: "duplicate_orders",
        message: `Duplicate order values found: ${duplicates.join(", ")}`,
        severity: "high",
      });
    }

    // Check for gaps in ordering
    const expectedOrders = Array.from(
      { length: profile.links.length },
      (_, i) => i
    );
    const missingOrders = expectedOrders.filter(
      (order) => !orders.includes(order)
    );
    if (missingOrders.length > 0) {
      issues.push({
        type: "missing_orders",
        message: `Missing order values: ${missingOrders.join(", ")}`,
        severity: "medium",
      });
    }

    // Check for negative orders (should only be temporary)
    const negativeOrders = orders.filter((order) => order < 0);
    if (negativeOrders.length > 0) {
      issues.push({
        type: "negative_orders",
        message: `Negative order values found (possible incomplete transaction): ${negativeOrders.join(
          ", "
        )}`,
        severity: "high",
      });
    }

    // Check for very high order values (possible overflow)
    const highOrders = orders.filter(
      (order) => order > profile.links.length * 2
    );
    if (highOrders.length > 0) {
      issues.push({
        type: "high_orders",
        message: `Unusually high order values: ${highOrders.join(", ")}`,
        severity: "low",
      });
    }

    return {
      success: true,
      linkCount: profile.links.length,
      orderRange: `${Math.min(...orders)} - ${Math.max(...orders)}`,
      issues: issues,
      links: profile.links.map((link) => ({
        id: link.id,
        title: link.title,
        order: link.order,
      })),
    };
  } catch (error) {
    console.error("Error diagnosing link ordering:", error);
    return { error: "Failed to diagnose ordering issues" };
  }
}

/**
 * Fixes ordering issues by reassigning sequential orders
 */
export async function fixLinkOrdering(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: {
        links: {
          orderBy: [
            { order: "asc" },
            { createdAt: "asc" }, // Secondary sort for consistency
          ],
        },
      },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    if (profile.links.length === 0) {
      return { success: true, message: "No links to fix" };
    }

    // Reassign sequential orders
    await prisma.$transaction(async (tx) => {
      // First set all to negative values to avoid constraints
      for (let i = 0; i < profile.links.length; i++) {
        await tx.link.update({
          where: { id: profile.links[i].id },
          data: { order: -(i + 1) },
        });
      }

      // Then set correct sequential orders
      for (let i = 0; i < profile.links.length; i++) {
        await tx.link.update({
          where: { id: profile.links[i].id },
          data: { order: i },
        });
      }
    });

    return {
      success: true,
      message: `Fixed ordering for ${profile.links.length} links`,
      linkCount: profile.links.length,
    };
  } catch (error) {
    console.error("Error fixing link ordering:", error);
    return { success: false, error: "Failed to fix ordering" };
  }
}

/**
 * Browser-friendly diagnostic function
 */
export function createOrderingDiagnosticScript() {
  return `
// Link Ordering Diagnostic Script
// Paste this in the browser console to check for ordering issues

async function runOrderingDiagnostic() {
  try {
    const response = await fetch('/api/links/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('🔍 Link Ordering Diagnostic Results:');
      console.log('📊 Link Count:', result.linkCount);
      console.log('📈 Order Range:', result.orderRange);
      
      if (result.issues.length === 0) {
        console.log('✅ No ordering issues found!');
      } else {
        console.log('⚠️ Issues found:');
        result.issues.forEach(issue => {
          const emoji = issue.severity === 'high' ? '🚨' : 
                       issue.severity === 'medium' ? '⚠️' : '💡';
          console.log(\`\${emoji} \${issue.type}: \${issue.message}\`);
        });
      }
      
      console.log('📋 Current Links:');
      result.links.forEach(link => {
        console.log(\`  \${link.order}: \${link.title} (id: \${link.id})\`);
      });
    } else {
      console.error('❌ Diagnostic failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Failed to run diagnostic:', error);
  }
}

// Run the diagnostic
runOrderingDiagnostic();
`;
}
