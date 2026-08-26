/** Manuscrit de Minuit — routes de Poiesis : un parcours continu entre seuil, table et galerie nocturne. */
import "@/styles/member-studio-theme.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import About from "@/pages/About";
import Create from "@/pages/Create";
import Echoes from "@/pages/Echoes";
import EmailConfirmed from "@/pages/EmailConfirmed";
import Gate from "@/pages/Gate";
import Home from "@/pages/Home";
import Intercept from "@/pages/Intercept";
import Join from "@/pages/Join";
import Login from "@/pages/Login";
import NightGallery from "@/pages/NightGallery";
import NotFound from "@/pages/NotFound";
import { Privacy, Terms } from "@/pages/Policies";
import SubmitEcho from "@/pages/SubmitEcho";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
function Router() {
  // make sure to consider if you need authentication for certain routes
  const base = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
  return <WouterRouter base={base}><Switch>
    <Route path="/" component={Gate} />
    <Route path="/login" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/join" component={Join} />
    <Route path="/create" component={Create} />
    <Route path="/echoes" component={Echoes} />
    <Route path="/email-confirmed" component={EmailConfirmed} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/terms" component={Terms} />
    <Route path="/create/intercept" component={Intercept} />
    <Route path="/create/submit" component={SubmitEcho} />
    <Route path="/night-gallery" component={NightGallery} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></WouterRouter>;
}

function StaticBuildConfigurationNotice() {
  if (isSupabaseConfigured) return null;

  return <aside className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl border border-[#d7b66f]/55 bg-[#24104c]/95 px-5 py-4 text-center text-sm text-[#fff5db] shadow-2xl backdrop-blur md:bottom-6 md:px-8" role="status">
    <strong className="font-serif tracking-wide text-[#ffd87e]">Poiesis is being prepared for this public address.</strong>
    <span className="ml-2">The house is open; member sign-in and Echoes will appear once the host receives its public Supabase configuration.</span>
  </aside>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark" switchable><TooltipProvider><Toaster /><Router /><StaticBuildConfigurationNotice /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
