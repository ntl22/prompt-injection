import levels from './levels.json';

export async function load() {
    const mappedLevels = levels.map(level => ({
        level: level.level,
        name: `Level ${level.level}`,
        description: level.description,
    }));

    return {
        levels: mappedLevels,
    };
}