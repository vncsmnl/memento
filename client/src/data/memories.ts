export type MemoryBlock =
    | {
        type: "text";
        text: string;
    }
    | {
        type: "image";
        src: string;
        alt: string;
        caption?: string;
    };

export interface MemoryEntryInput {
    year: number;
    month: number; // 1-12
    title: string;
    summary?: string;
    tags?: string[];
    blocks: MemoryBlock[];
}

export interface MemoryEntry {
    key: string;
    year: number;
    month: number;
    title: string;
    summary?: string;
    tags: string[];
    blocks: MemoryBlock[];
}

export const getMemoryKey = (year: number, month: number) =>
    `${year}-${String(month).padStart(2, "0")}`;

// Adicione novas memorias aqui seguindo o mesmo padrao.
// Dica para imagens locais: coloque em client/public/memories e use src como "/memories/foto.jpg".
export const MEMORY_ENTRIES: MemoryEntryInput[] = [
    {
        year: 2026,
        month: 3,
        title: "Defesa da minha tese de mestrado",
        summary: "Esse eu defendi minha tese de mestrado, e passei no processo seletivo para doutorado. Foi um mês de muita emoção e conquista.",
        tags: ["estudos", "aprendizado"],
        blocks: [
            {
                type: "text",
                text: "Esse mês foi um marco importante na minha jornada acadêmica. Depois de anos de dedicação, finalmente defendi minha tese de mestrado. Foi um momento de muita emoção, orgulho e alívio. A defesa foi desafiadora, mas consegui apresentar meu trabalho com confiança e responder às perguntas da banca examinadora. Estou muito feliz por ter alcançado essa conquista e grato por todo o apoio que recebi ao longo do caminho.",
            },
            {
                type: "image",
                src: "/memories/defesa_mestrado.png",
                alt: "Foto da banca examinadora durante a defesa da tese.",
                caption: "Foto da banca examinadora durante a defesa da tese.",
            },
        ],
    },
    {
        year: 2022,
        month: 11,
        title: "Reconexao com o que importa",
        summary: "Tempo de introspeccao, familia e reavaliacao de prioridades.",
        tags: ["familia", "vida"],
        blocks: [
            {
                type: "text",
                text: "Esse mes me lembrou que nao existe produtividade sem significado. Voltei para o essencial.",
            },
        ],
    },
];

export const MEMORY_INDEX: Record<string, MemoryEntry> = MEMORY_ENTRIES.reduce(
    (acc, entry) => {
        const key = getMemoryKey(entry.year, entry.month);
        acc[key] = {
            ...entry,
            key,
            tags: entry.tags ?? [],
        };
        return acc;
    },
    {} as Record<string, MemoryEntry>
);
