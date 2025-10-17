import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Workflow Execution State Management
 */

// Create execution record
export const createExecution = mutation({
  args: {
    workflowId: v.id("workflows"),
    input: v.optional(v.any()),
    threadId: v.optional(v.string()),
  },
  handler: async ({ db }, { workflowId, input, threadId }) => {
    const executionId = await db.insert("executions", {
      workflowId,
      status: "running",
      input,
      threadId,
      nodeResults: {},
      variables: {},
      startedAt: new Date().toISOString(),
    });
    return executionId;
  },
});

// Update execution state
export const updateExecution = mutation({
  args: {
    id: v.id("executions"),
    status: v.optional(v.string()),
    currentNodeId: v.optional(v.string()),
    nodeResults: v.optional(v.any()),
    variables: v.optional(v.any()),
    output: v.optional(v.any()),
    error: v.optional(v.string()),
  },
  handler: async ({ db }, { id, ...updates }) => {
    await db.patch(id, updates);
    return id;
  },
});

// Complete execution
export const completeExecution = mutation({
  args: {
    id: v.id("executions"),
    output: v.optional(v.any()),
    error: v.optional(v.string()),
  },
  handler: async ({ db }, { id, output, error }) => {
    await db.patch(id, {
      status: error ? "failed" : "completed",
      output,
      error,
      completedAt: new Date().toISOString(),
    });
    return id;
  },
});

// Get execution by ID
export const getExecution = query({
  args: { id: v.id("executions") },
  handler: async ({ db }, { id }) => {
    const execution = await db.get(id);
    return execution;
  },
});

// Get executions for a workflow
export const getWorkflowExecutions = query({
  args: { workflowId: v.id("workflows") },
  handler: async ({ db }, { workflowId }) => {
    const executions = await db
      .query("executions")
      .withIndex("by_workflow", (q) => q.eq("workflowId", workflowId))
      .order("desc")
      .collect();
    return executions;
  },
});

// List all executions for the authenticated user
export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return [];
    }

    // Get all executions, ordered by most recent first
    const executions = await ctx.db
      .query("executions")
      .order("desc")
      .take(50); // Limit to 50 most recent

    // Filter to only show executions for workflows owned by this user
    const userExecutions: Array<any> = [];
    for (const execution of executions) {
      const workflow = await ctx.db.get(execution.workflowId);
      if (workflow && workflow.userId === identity.subject) {
        userExecutions.push({
          ...execution,
          workflowName: workflow.name,
        });
      }
    }

    return userExecutions;
  },
});
