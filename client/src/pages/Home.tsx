import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MEMORY_INDEX, getMemoryKey, type MemoryEntry } from '@/data/memories';

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

interface MonthCellData {
  index: number;
  isLived: boolean;
  date: Date;
  memoryKey: string;
  memory?: MemoryEntry;
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
  const [selectedMonth, setSelectedMonth] = useState<MonthCellData | null>(null);

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

  const months = Array.from({ length: lifeSpanMonths }, (_, i) => {
    const monthDate = new Date(birthDate);
    monthDate.setMonth(birthDate.getMonth() + i);

    const memoryKey = getMemoryKey(monthDate.getFullYear(), monthDate.getMonth() + 1);

    return {
      index: i,
      isLived: i < stats.monthsLived,
      date: monthDate,
      memoryKey,
      memory: MEMORY_INDEX[memoryKey],
    };
  });
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
                    <button
                      key={month.index}
                      type="button"
                      onClick={() => setSelectedMonth(month)}
                      aria-label={`Abrir memoria de ${month.date.toLocaleString('pt-BR', {
                        month: 'long',
                        year: 'numeric',
                      })}`}
                      className={`
                        month-cell aspect-square rounded-[10px]
                        ${month.isLived
                          ? 'month-cell--lived bg-accent/80 border border-accent/60 shadow-sm'
                          : 'month-cell--future bg-muted/40 border border-border/60'
                        }
                        ${month.memory ? 'ring-2 ring-offset-2 ring-offset-background ring-[#47623E]' : ''}
                      `}
                      style={{
                        backgroundColor: month.isLived ? '#6b5344' : '#d4cfc8',
                        borderColor: month.isLived ? '#5a4535' : '#c8c1b8',
                      }}
                      title={`${month.date.toLocaleString('pt-BR', {
                        month: 'long',
                        year: 'numeric',
                      })}${month.memory ? ` - ${month.memory.title}` : ''}`}
                    >
                      <span className="sr-only">{month.memory ? month.memory.title : 'Sem memoria cadastrada'}</span>
                    </button>
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
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 rounded-[3px]" style={{ border: '2px solid #47623E' }} />
              <p className="text-sm text-foreground" style={{ fontFamily: "'Crimson Text', serif" }}>Mês com memória</p>
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

      <Dialog open={Boolean(selectedMonth)} onOpenChange={(open) => !open && setSelectedMonth(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-[#cebfae] bg-[#f9f7f2]">
          {selectedMonth && (
            <>
              <DialogHeader className="px-6 pt-6 pb-3 border-b border-[#d8cec2]">
                <DialogTitle className="text-3xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2c2c2c' }}>
                  {selectedMonth.memory?.title ?? 'Sem memória cadastrada'}
                </DialogTitle>
                <DialogDescription className="text-foreground/70" style={{ fontFamily: "'Crimson Text', serif" }}>
                  {selectedMonth.date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[70vh]">
                <div className="px-6 py-5 space-y-5">
                  {selectedMonth.memory ? (
                    <>
                      {selectedMonth.memory.summary && (
                        <p className="text-base leading-relaxed text-foreground/85" style={{ fontFamily: "'Crimson Text', serif" }}>
                          {selectedMonth.memory.summary}
                        </p>
                      )}

                      {selectedMonth.memory.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedMonth.memory.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs uppercase tracking-wider rounded-full border border-[#b79f8d] text-[#5a4535]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="space-y-5">
                        {selectedMonth.memory.blocks.map((block, blockIndex) =>
                          block.type === 'text' ? (
                            <p
                              key={`${selectedMonth.memoryKey}-text-${blockIndex}`}
                              className="text-base leading-relaxed text-foreground/90 whitespace-pre-line"
                              style={{ fontFamily: "'Crimson Text', serif" }}
                            >
                              {block.text}
                            </p>
                          ) : (
                            <figure key={`${selectedMonth.memoryKey}-image-${blockIndex}`} className="space-y-2">
                              <img
                                src={block.src}
                                alt={block.alt}
                                loading="lazy"
                                className="w-full rounded-md border border-[#d1c4b7] object-cover max-h-[420px]"
                              />
                              {block.caption && (
                                <figcaption className="text-sm text-foreground/65 italic" style={{ fontFamily: "'Crimson Text', serif" }}>
                                  {block.caption}
                                </figcaption>
                              )}
                            </figure>
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-base leading-relaxed text-foreground/75" style={{ fontFamily: "'Crimson Text', serif" }}>
                      Ainda não existe uma memória cadastrada para este mês.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
