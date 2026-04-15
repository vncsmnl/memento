import { useEffect, useState } from 'react';

/**
 * DESIGN PHILOSOPHY: Gregoriano Filosófico - Clássico Minimalista
 * - Tipografia elegante: Cormorant Garamond (títulos), Crimson Text (corpo), Lora (números)
 * - Paleta neutra: Marfim/Creme com acentos sépia quente
 * - Espaço negativo generoso e contemplativo
 * - Linhas finas como divisores
 * - Inspiração em manuscritos medievais e filosofia clássica
 */

interface LifeStats {
  monthsLived: number;
  monthsRemaining: number;
  yearsLived: number;
  yearsRemaining: number;
  percentageLived: number;
  nextBirthdayDate: Date;
  daysUntilBirthday: number;
}

const PHILOSOPHICAL_QUOTES = [
  "Memento Mori — Lembre-se de que você morrerá",
  "A vida é breve, mas a arte é longa — Hipócrates",
  "Ninguém pode viver feliz que só olha para trás — Sêneca",
  "O tempo é o tecido em que a vida é tecida — Sêneca",
  "Viver é pensar — Cícero",
  "Você pode deixar a vida agora — deixe isso determinar o que você faz, diz e pensa — Marco Aurélio",
  "Não é que temos pouco tempo, mas que perdemos muito — Sêneca",
  "A morte sorri para todos; tudo que podemos fazer é sorrir de volta — Marco Aurélio",
  "Enquanto adiamos, a vida passa — Sêneca",
  "A morte não é um mal; o mal é temê-la — Epicteto",
  "Cada dia é uma vida em miniatura — Sêneca",
  "Não viva como se fosse viver mil anos — Marco Aurélio",
  "A vida é longa o suficiente, se soubermos usá-la — Sêneca",
  "O homem morre tantas vezes quantas perde aquilo que ama — Publílio Siro",
  "Lembre-se: você é mortal, mas suas ações ecoam — adaptação estoica",
  "O fim dá valor ao começo — reflexão estoica",
  "Quem aprende a morrer desaprende a ser escravo — Sêneca",
  "A consciência da morte é o despertar para a vida — inspiração estoica",
  "Nada é nosso, exceto o tempo — Sêneca",
  "Viva hoje como se já tivesse vivido o suficiente — inspiração estoica"
];

export default function Home() {
  const [stats, setStats] = useState<LifeStats | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quote, setQuote] = useState(PHILOSOPHICAL_QUOTES[0]);

  // Data de nascimento: 07/01/1998
  const birthDate = new Date(1998, 0, 7); // Janeiro = 0
  const lifeSpanMonths = 80 * 12; // 80 anos em meses

  const calculateStats = (now: Date): LifeStats => {
    // Calcular meses vividos
    let monthsLived = 0;
    let tempDate = new Date(birthDate);

    while (tempDate <= now) {
      tempDate.setMonth(tempDate.getMonth() + 1);
      if (tempDate <= now) {
        monthsLived++;
      }
    }

    const monthsRemaining = lifeSpanMonths - monthsLived;
    const yearsLived = Math.floor(monthsLived / 12);
    const yearsRemaining = Math.floor(monthsRemaining / 12);
    const percentageLived = (monthsLived / lifeSpanMonths) * 100;

    // Próximo aniversário
    let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < now) {
      nextBirthday = new Date(now.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }

    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    return {
      monthsLived,
      monthsRemaining,
      yearsLived,
      yearsRemaining,
      percentageLived,
      nextBirthdayDate: nextBirthday,
      daysUntilBirthday,
    };
  };

  useEffect(() => {
    const stats = calculateStats(currentDate);
    setStats(stats);
    setQuote(PHILOSOPHICAL_QUOTES[Math.floor(Math.random() * PHILOSOPHICAL_QUOTES.length)]);

    // Atualizar a cada minuto
    const interval = setInterval(() => {
      const newDate = new Date();
      setCurrentDate(newDate);
      setStats(calculateStats(newDate));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-center">
          <p className="text-lg font-light" style={{ fontFamily: "'Crimson Text', serif" }}>Carregando sua vida...</p>
        </div>
      </div>
    );
  }

  const months = Array.from({ length: lifeSpanMonths }, (_, i) => ({
    index: i,
    isLived: i < stats.monthsLived,
  }));
  const monthRows = Array.from({ length: lifeSpanMonths / 12 }, (_, rowIndex) =>
    months.slice(rowIndex * 12, rowIndex * 12 + 12)
  );

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ backgroundColor: '#f9f7f2' }}>
      {/* Header */}
      <header className="pt-16 pb-8 px-4 border-b border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-light mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2c2c2c' }}>
            /meˈmenˌto ˈmore/
          </h1>
          <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-8" />
          <p className="text-lg italic text-foreground/70 mb-2" style={{ fontFamily: "'Crimson Text', serif" }}>
            {quote}
          </p>
          <p className="text-sm text-foreground/60" style={{ fontFamily: "'Crimson Text', serif" }}>
            Uma visualização da minha vida em meses.
          </p>
        </div>
      </header>

      {/* Stats Section - Vertical Layout */}
      <section className="py-12 px-4 border-b border-border/40">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Meses Vividos */}
            <div className="flex items-baseline gap-8">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Meses Vividos</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Lora', serif", color: '#6b5344' }}>
                  {stats.monthsLived}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Anos Vividos</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Lora', serif", color: '#6b5344' }}>
                  {stats.yearsLived}
                </p>
              </div>
            </div>

            <div className="h-px bg-border/30" />

            {/* Percentual e Aniversário */}
            <div className="flex items-baseline gap-8">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Vida Vivida</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Lora', serif", color: '#6b5344' }}>
                  {stats.percentageLived.toFixed(1)}%
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Próximo Aniversário</p>
                <p className="text-5xl font-light" style={{ fontFamily: "'Lora', serif", color: '#6b5344' }}>
                  {stats.daysUntilBirthday}
                </p>
                <p className="text-xs text-foreground/50 mt-1">dias</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Meses */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-widest text-foreground/50 mb-4">
              Minha vida em {lifeSpanMonths} meses
            </p>
            <p className="text-xs text-foreground/40" style={{ fontFamily: "'Crimson Text', serif" }}>
              Cada célula representa um mês. Cada linha representa um ano.
            </p>
          </div>

          {/* Linhas de 12 meses com rótulo no final */}
          <div className="space-y-1.5">
            {monthRows.map((row, yearIndex) => (
              <div key={yearIndex} className="flex items-center gap-3">
                <div className="grid gap-1.5 flex-1" style={{ gridTemplateColumns: 'repeat(12, minmax(0, 1fr))' }}>
                  {row.map((month) => (
                    <div
                      key={month.index}
                      className={`
                        month-cell aspect-square cursor-pointer rounded-[10px]
                        ${month.isLived
                          ? 'month-cell--lived bg-accent/80 border border-accent/60 shadow-sm'
                          : 'month-cell--future bg-muted/40 border border-border/60'
                        }
                      `}
                      style={{
                        backgroundColor: month.isLived ? '#6b5344' : '#d4cfc8',
                        borderColor: month.isLived ? '#5a4535' : '#c8c1b8',
                      }}
                      title={`Mês ${month.index + 1} - Ano ${yearIndex}`}
                    />
                  ))}
                </div>
                <span className="w-16 shrink-0 text-right text-[11px] uppercase tracking-wider text-foreground/45">
                  Ano {yearIndex + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="mt-12 pt-8 border-t border-border/30 space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-5 h-5" style={{ backgroundColor: '#6b5344', border: '1px solid #5a4535' }} />
              <p className="text-sm text-foreground" style={{ fontFamily: "'Crimson Text', serif" }}>Mês vivido</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-5 h-5" style={{ backgroundColor: '#d4cfc8', border: '1px solid #c8c1b8' }} />
              <p className="text-sm text-foreground" style={{ fontFamily: "'Crimson Text', serif" }}>Mês futuro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4 mt-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-sm text-foreground/60 italic" style={{ fontFamily: "'Crimson Text', serif" }}>
            "A morte é a melhor invenção da vida. É o agente de mudança da vida." — Steve Jobs
          </p>
          <div className="h-px bg-border/30" />
          <p className="text-xs text-foreground/40">
            Última atualização: {currentDate.toLocaleString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </footer>
    </div>
  );
}
