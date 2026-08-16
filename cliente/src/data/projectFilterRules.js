/**
 * Semantic rules used by the project language filter.
 *
 * These rules describe the portfolio taxonomy, not whether two file types can
 * ever coexist inside a repository. Keep the rules deliberately conservative:
 * only alternatives that should behave as one selectable technology family
 * belong in an exclusive group.
 */
export const exclusiveLanguageGroups = [
  {
    id: 'stylesheet-language',
    label: 'Stylesheet language',
    members: ['CSS', 'SCSS', 'Sass', 'Less']
  }
];

/**
 * Reserved for precise pairwise incompatibilities that do not belong to a
 * broader exclusive family. Keep empty until a real portfolio rule requires it.
 */
export const incompatibleLanguagePairs = [];

function getExclusiveGroup(language) {
  return exclusiveLanguageGroups.find((group) => group.members.includes(language)) || null;
}

function getDirectConflicts(language) {
  return incompatibleLanguagePairs.flatMap(([left, right]) => {
    if (left === language) return [right];
    if (right === language) return [left];
    return [];
  });
}

export function resolveLanguageSelection(currentSelection, language) {
  if (currentSelection.includes(language)) {
    return {
      selection: currentSelection.filter((item) => item !== language),
      replaced: []
    };
  }

  const exclusiveGroup = getExclusiveGroup(language);
  const directConflicts = new Set(getDirectConflicts(language));
  const replaced = [];

  const selection = currentSelection.filter((selected) => {
    const conflictsByGroup = exclusiveGroup?.members.includes(selected) ?? false;
    const conflictsDirectly = directConflicts.has(selected);
    const shouldReplace = conflictsByGroup || conflictsDirectly;

    if (shouldReplace) replaced.push(selected);
    return !shouldReplace;
  });

  return {
    selection: [...selection, language],
    replaced
  };
}
