import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";
import Image from "next/image";

export function WorkflowInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <Card className="lg:col-span-2 overflow-hidden border-agri-outline-variant shadow-sm relative group">
        <div className="absolute inset-0 z-0">
          <Image
            src="/farm_data_visualization_wheat_field_1777625115537.png"
            alt="Workflow Insights"
            fill
            className="object-cover opacity-10 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
        </div>
        <CardContent className="p-8 relative z-10 flex flex-col h-full justify-center gap-4 max-w-xl">
          <h3 className="text-2xl font-bold text-agri-on-surface">Optimizing Your Workflow</h3>
          <p className="text-agri-on-surface-variant leading-relaxed">
            The Munda system has detected that 68% of your critical tasks are related to irrigation this week.
            Consider automating schedule adjustments based on local precipitation data.
          </p>
          <button className="flex items-center gap-2 text-agri-primary font-bold hover:gap-3 transition-all">
            View Insights <ArrowRight className="h-4 w-4" />
          </button>
        </CardContent>
      </Card>

      <Card className="bg-[#2d4d35] border-none shadow-lg text-white">
        <CardContent className="p-8 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <Lightbulb className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">Daily Tip</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-bold">Batch your machinery checks.</h4>
            <p className="text-white/80 text-sm leading-relaxed">
              Completing all maintenance tasks in the workshop at once can save up to 2 hours of transit time across fields today.
            </p>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-[#2d4d35] bg-white/20" />
              ))}
              <div className="h-8 flex items-center pl-4 text-xs font-medium text-white/60">
                +12 other tips
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
