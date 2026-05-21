import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CapabilityCardProps {
  title: string
  description: string
  servicesLabel: string
  services: string[]
  icon: React.ReactNode
}

export function CapabilityCard({ title, description, servicesLabel, services, icon }: CapabilityCardProps) {
  return (
    <Card className="h-full border-border/50 transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm font-semibold text-foreground">{servicesLabel}</p>
        <ul className="space-y-2">
          {services.map((service, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
              {service}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
