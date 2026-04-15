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
        year: 2024,
        month: 2,
        title: "PPGi UnB - Início do mestrado",
        summary: "Esse mês eu comecei meu mestrado no PPGi da UnB. Foi um mês de muita expectativa e aprendizado, conhecendo novos colegas e professores.",
        tags: ["estudos", "vida"],
        blocks: [
            {
                type: "text",
                text: "Foi um mês bem intenso, com muitas reuniões, leituras e adaptações. Mas muito feliz por essa conquista e animado para os próximos anos de pesquisa.",
            },
            {
                type: "image",
                src: "./memories/ppgi_mestrado.jpg",
                alt: "Foto do Resultado.",
                caption: "Foto do Resultado.",
            },
        ],
    },
    {
        year: 2026,
        month: 3,
        title: "Defesa da minha tese de mestrado",
        summary: "Esse mês eu defendi minha tese de mestrado, e passei no processo seletivo para doutorado. Foi um mês de muita emoção e conquista.",
        tags: ["estudos", "aprendizado"],
        blocks: [
            {
                type: "image",
                src: "./memories/defesa_mestrado.png",
                alt: "Foto da banca examinadora durante a defesa da tese.",
                caption: "Foto da banca examinadora durante a defesa da tese.",
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
