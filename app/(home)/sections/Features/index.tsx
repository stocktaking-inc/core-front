import { features } from './FeatureList'

export const FeaturesSection = () => {
  return (
    <section
      id='features'
      className='py-12 md:py-24 lg:py-32 bg-background'
    >
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Возможности системы
        </h2>
        <p className='max-w-[900px] text-muted-foreground md:text-xl'>
          Наша система управления инвентаризацией предоставляет полный набор инструментов для
          эффективного управления запасами
        </p>
      </div>
      <div className='mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4'>
        {features.map(feature => (
          <div
            key={feature.title}
            className='flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm bg-card'
          >
            {feature.icon}
            <h3 className='text-xl font-bold text-center'>{feature.title}</h3>
            <p className='text-center text-muted-foreground'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
