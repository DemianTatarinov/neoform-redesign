import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import PortfolioPage from "@/pages/PortfolioPage";
import SectionPage from "@/pages/SectionPage";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/portfolio" component={PortfolioPage} />
    <Route path="/bespoke"><SectionPage page="bespoke" /></Route>
    <Route path="/credo"><SectionPage page="credo" /></Route>
    <Route path="/architects"><SectionPage page="architects" /></Route>
    <Route path="/process"><SectionPage page="process" /></Route>
    <Route path="/neo-lab"><SectionPage page="neo-lab" /></Route>
    <Route path="/contact"><SectionPage page="contact" /></Route>
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
