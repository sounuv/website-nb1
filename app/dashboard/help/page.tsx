"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How do credits work?",
    answer:
      "Credits are consumed when you use our AI services. Different operations consume different amounts of credits. Analysis typically uses 5 credits, while generation might use 8-10 credits depending on the complexity.",
  },
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade your plan at any time. The new plan will take effect immediately, and you'll be charged the prorated difference.",
  },
  {
    question: "How to customize the extension?",
    answer:
      "Go to Extension Settings in your dashboard to customize the appearance, keyboard shortcuts, and other preferences.",
  },
  {
    question: "What are the keyboard shortcuts?",
    answer:
      "Press Ctrl+Shift+H to open the help menu, Ctrl+Shift+A for quick analysis, and Ctrl+Shift+G for quick generation.",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Help Center</h1>
      </div>

      <div>
        <Input
          type="search"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xl bg-[#1a1f36] border-[#2e3650] text-white placeholder-gray-400"
        />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-white">Quick Links</h2>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e] hover:text-white"
          >
            Getting Started
          </Button>
          <Button
            variant="outline"
            className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e] hover:text-white"
          >
            Billing
          </Button>
          <Button
            variant="outline"
            className="bg-[#1a1f36] border-[#2e3650] text-white hover:bg-[#2a2d3e] hover:text-white"
          >
            Features
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-white">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-[#2e3650]">
              <AccordionTrigger className="text-white hover:text-[#3538CD]">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="rounded-lg border border-[#2e3650] bg-[#1a1f36] p-6">
        <h2 className="text-lg font-medium text-white">Need more help?</h2>
        <p className="mt-2 text-gray-400">Our support team is here to help you with any questions you may have.</p>
        <Button className="mt-4 bg-[#3538CD] hover:bg-[#2a2ca8] text-white">Contact Support</Button>
      </div>
    </div>
  )
}

