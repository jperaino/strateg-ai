import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useBudgetContext } from "./BudgetContext";
import { Card } from "../ui/card";
import { formatFinancial } from "@/lib/utils";

const BudgetTable = () => {
  const { budget } = useBudgetContext();

  return (
    <div className="w-full space-y-4">
      {budget?.map((category, i) => (
        <Card key={`category-${i}`}>
          <div className="bg-slate-100 flex justify-between p-4 text-md font-bold">
            <p>{category.name}</p>
            <p>{formatFinancial(category.amount, true)}</p>
          </div>
          <Table>
            <TableBody>
              {category.subCategories.map((subCategory, j) => (
                <TableRow key={`subcategory-${j}`}>
                  <TableCell className="font-light">
                    {subCategory.name}
                  </TableCell>
                  <TableCell className=""></TableCell>
                  <TableCell className=" text-right">
                    {formatFinancial(subCategory.amount, true)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ))}
    </div>
  );
};

export default BudgetTable;
