import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedConvexClient, api, isConvexConfigured } from '@/lib/convex/client';

export const dynamic = 'force-dynamic';

/**
 * GET /api/workflow/runs - List all workflow execution runs
 */
export async function GET(request: NextRequest) {
  try {
    if (!isConvexConfigured()) {
      return NextResponse.json({
        runs: [],
        total: 0,
        message: 'Convex not configured',
      });
    }

    const convex = await getAuthenticatedConvexClient();
    
    // Query executions from Convex
    const executions = await convex.query(api.executions.list, {});

    // Transform executions to runs format
    const runs = executions.map((exec: any) => {
      const duration = exec.completedAt && exec.startedAt
        ? `${Math.round((new Date(exec.completedAt).getTime() - new Date(exec.startedAt).getTime()) / 1000)}s`
        : undefined;

      return {
        id: exec._id,
        workflowName: exec.workflowName || 'Untitled Workflow',
        status: exec.status === 'completed' ? 'completed' : 
                exec.status === 'running' ? 'running' : 'failed',
        startedAt: exec.startedAt || exec.createdAt,
        completedAt: exec.completedAt,
        duration,
        output: exec.output,
        error: exec.error,
        nodeResults: exec.nodeResults,
      };
    });

    return NextResponse.json({
      runs,
      total: runs.length,
    });
  } catch (error) {
    console.error('Error fetching workflow runs:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch workflow runs',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
