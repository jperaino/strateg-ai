// See https://lucide.dev/guide/packages/lucide-react#with-dynamic-imports

import { lazy, Suspense } from "react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

const LucideIcon = ({ name, ...props }: IconProps) => {
  const LucideIconBase = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIconBase {...props} />
    </Suspense>
  );
};

export default LucideIcon;
