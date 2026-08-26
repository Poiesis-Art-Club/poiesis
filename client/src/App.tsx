/** Manuscrit de Minuit — routes de Poiesis : un parcours continu entre seuil, table et galerie nocturne. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import About from "@/pages/About";
import Create from "@/pages/Create";
import Echoes from "@/pages/Echoes";
import Gate from "@/pages/Gate";
import Home from "@/pages/Home";
import Intercept from "@/pages/Intercept";
import Join from "@/pages/Join";
import Login from "@/pages/Login";
import NightGallery from "@/pages/NightGallery";
import NotFound from "@/pages/NotFound";
import SubmitEcho from "@/pages/SubmitEcho";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return <Switch>
    <Route path="/" component={Gate} />
    <Route path="/login" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/join" component={Join} />
    <Route path="/create" component={Create} />
    <Route path="/echoes" component={Echoes} />
    <Route path="/create/intercept" component={Intercept} />
    <Route path="/create/submit" component={SubmitEcho} />
    <Route path="/night-gallery" component={NightGallery} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark" switchable><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
