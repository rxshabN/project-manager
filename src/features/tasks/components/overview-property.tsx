interface OverviewProperyProps {
  label: string;
  children: React.ReactNode;
}

export const OverviewPropery = ({ label, children }: OverviewProperyProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="min-w-[100px]">
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
};
