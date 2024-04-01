import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Assistant from "./Assistant";
import BudgetTable from "./BudgetTable";
import { useBudgetContext } from "./BudgetContext";
import { formatFinancial } from "@/lib/utils";

const BudgetPage = () => {
  const { monthlyCashflow } = useBudgetContext();

  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Your Budget</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Manage your monthly spend here to calculate your cashflow and to
                serve as a baseline for your scenarios.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Create New Category</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly Cashflow</CardDescription>
              <CardTitle className="text-4xl">
                {formatFinancial(monthlyCashflow)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Annual Cashflow</CardDescription>
              <CardTitle className="text-3xl">
                {formatFinancial(monthlyCashflow * 12)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={12} aria-label="12% increase" />
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader className="px-7">
            <CardTitle>Budget</CardTitle>
            <CardDescription>
              Monthly spend for categories and subcategories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetTable />
          </CardContent>
        </Card>
      </div>
      <Assistant />
    </>
  );
};

export default BudgetPage;
