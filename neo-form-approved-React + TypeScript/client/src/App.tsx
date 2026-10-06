import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import CredoPage from "@/pages/CredoPage";
import TeamPage from "@/pages/TeamPage";
import BespokePage from "@/pages/BespokePage";
import MaterialsPage from "@/pages/MaterialsPage";
import TechnologyPage from "@/pages/TechnologyPage";
import ArchitectsPage from "@/pages/ArchitectsPage";
import ProcessPage from "@/pages/ProcessPage";
import ProjectsPage from "@/pages/ProjectsPage";
import NeoLabPage from "@/pages/NeoLabPage";
import ContactPage from "@/pages/ContactPage";
import { Redirect, Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteHeader from "./components/SiteHeader";
import { ThemeProvider } from "./contexts/ThemeContext";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/credo" component={CredoPage} />
      <Route path="/zespol" component={TeamPage} />
      <Route path="/bespoke" component={BespokePage} />
      <Route path="/materialy" component={MaterialsPage} />
      <Route path="/technologia" component={TechnologyPage} />
      <Route path="/architekci" component={ArchitectsPage} />
      <Route path="/proces" component={ProcessPage} />
      <Route path="/realizacje" component={ProjectsPage} />
      <Route path="/neo-lab" component={NeoLabPage} />
      <Route path="/kontakt" component={ContactPage} />
      <Route path="/portfolio"><Redirect to="/realizacje" /></Route>
      <Route path="/architects"><Redirect to="/architekci" /></Route>
      <Route path="/process"><Redirect to="/proces" /></Route>
      <Route path="/contact"><Redirect to="/kontakt" /></Route>
      <Route path="/neolab"><Redirect to="/neo-lab" /></Route>
      <Route path="/neolab/peka" component={NeoLabPage} />
      <Route path="/neolab/materialy" component={NeoLabPage} />
      <Route path="/neolab/architekci" component={NeoLabPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <SiteHeader />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
