"use client";

import { useState, useEffect, Suspense } from "react";
import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

// Import landing sections
import HeroSection from "@/components/app/(home)/sections/landing/HeroSection";
import FeaturesSection from "@/components/app/(home)/sections/landing/FeaturesSection";
import HowItWorksSection from "@/components/app/(home)/sections/landing/HowItWorksSection";
import TestimonialsSection from "@/components/app/(home)/sections/landing/TestimonialsSection";
import CTASection from "@/components/app/(home)/sections/landing/CTASection";

// Import workflow builder
import Step2Placeholder from "@/components/app/(home)/sections/step2/Step2Placeholder";
import WorkflowBuilder from "@/components/app/(home)/sections/workflow-builder/WorkflowBuilder";

function LandingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showStep2, setShowStep2] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [loadWorkflowId, setLoadWorkflowId] = useState<string | null>(null);
  const [loadTemplateId, setLoadTemplateId] = useState<string | null>(null);

  // Handle URL params
  useEffect(() => {
    if (!searchParams) return;

    const view = searchParams.get('view');
    const workflowId = searchParams.get('workflow');
    const templateId = searchParams.get('template');

    if (view === 'workflows') {
      setShowStep2(true);
      setShowWorkflowBuilder(false);
    } else if (workflowId) {
      setLoadWorkflowId(workflowId);
      setShowWorkflowBuilder(true);
      setShowStep2(false);
    } else if (templateId) {
      setLoadTemplateId(templateId);
      setShowWorkflowBuilder(true);
      setShowStep2(false);
    }
  }, [searchParams]);

  const handleGetStarted = () => {
    setShowStep2(true);
    router.push('/?view=workflows');
  };

  const handleReset = () => {
    setShowStep2(false);
    setShowWorkflowBuilder(false);
    setLoadWorkflowId(null);
    setLoadTemplateId(null);
    router.push('/');
  };

  const handleCreateWorkflow = () => {
    setLoadWorkflowId(null);
    setLoadTemplateId(null);
    setShowWorkflowBuilder(true);
    router.push('/?view=builder');
  };

  return (
    <>
      {showWorkflowBuilder ? (
        <SignedIn>
          <WorkflowBuilder
            onBack={handleReset}
            initialWorkflowId={loadWorkflowId}
            initialTemplateId={loadTemplateId}
          />
        </SignedIn>
      ) : showStep2 ? (
        <SignedIn>
          <div className="min-h-screen bg-background-base">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border-faint">
              <div className="max-w-7xl mx-auto px-20 py-16 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-pink-500">AI</span> Workflow Builder
                </h1>
                <div className="flex items-center gap-12">
                  <button
                    onClick={handleReset}
                    className="px-16 py-8 text-accent-black hover:text-primary-100 transition-colors"
                  >
                    ← Back
                  </button>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-32 h-32",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </div>
              </div>
            </header>

            {/* Workflows View */}
            <div className="py-40">
              <Step2Placeholder
                onReset={handleReset}
                onCreateWorkflow={handleCreateWorkflow}
                onLoadWorkflow={(id) => {
                  setLoadWorkflowId(id);
                  setLoadTemplateId(null);
                  setShowWorkflowBuilder(true);
                  router.push(`/?workflow=${id}`);
                }}
                onLoadTemplate={(templateId) => {
                  setLoadTemplateId(templateId);
                  setLoadWorkflowId(null);
                  setShowWorkflowBuilder(true);
                  router.push(`/?template=${templateId}`);
                }}
              />
            </div>
          </div>
        </SignedIn>
      ) : (
        <div className="min-h-screen bg-white">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border-faint">
            <div className="max-w-7xl mx-auto px-20 py-16 flex items-center justify-between">
              <div className="flex items-center gap-48">
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-pink-500">AI</span> Workflow Builder
                </h1>
                <a 
                  href="https://ai-tutor-flow.vercel.app/?view=workflows"
                  className="text-base font-medium text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Builder
                </a>
                <a 
                  href="https://account.myapps.ai"
                  className="text-base font-medium text-gray-700 hover:text-pink-500 transition-colors"
                >
                  Manage Account
                </a>
              </div>
              
              <div className="flex items-center gap-16">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-20 py-10 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full font-semibold transition-all active:scale-95">
                      Sign In
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-32 h-32",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </SignedIn>
              </div>
            </div>
          </nav>

          {/* Landing Page Sections */}
          <HeroSection onGetStarted={handleGetStarted} />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <CTASection onGetStarted={handleGetStarted} />

          {/* Footer */}
          <footer className="py-40 px-20 bg-gradient-to-br from-purple-50 to-white border-t border-border-faint">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-16">
                <span className="text-pink-500">AI</span> Workflow Builder
              </h2>
              <p className="text-accent-black mb-16">
                Build powerful AI automation workflows without code
              </p>
              <div className="flex justify-center gap-24 text-sm text-accent-black">
                <a href="#" className="hover:text-primary-100 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary-100 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary-100 transition-colors">Contact</a>
              </div>
              <p className="text-xs text-accent-black opacity-60 mt-24">
                © 2025 AI Workflow Builder. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}