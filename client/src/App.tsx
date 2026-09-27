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
import Join from "@/pages/Join";
import Login from "@/pages/Login";
import NightGallery from "@/pages/NightGallery";
import NotFound from "@/pages/NotFound";
import { Privacy, Terms } from "@/pages/Policies";
import Team from "@/pages/Team";
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
    <Route path="/team" component={Team} />
    <Route path="/join" component={Join} />
    <Route path="/create" component={Create} />
    <Route path="/echoes" component={Echoes} />
    <Route path="/gallery" component={Echoes} />
    <Route path="/email-confirmed" component={EmailConfirmed} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/terms" component={Terms} />
    <Route path="/night-gallery" component={NightGallery} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></WouterRouter>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark" switchable={false}><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
