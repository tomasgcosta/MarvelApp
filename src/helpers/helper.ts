import CreatorType from "../types/Creator";

const standardString = (string: string): string => {
  return string.toLowerCase();
};

export const filterOptions = (
  creator: CreatorType[],
  suggestion: string
): CreatorType[] | undefined => {
    if(!creator) return undefined


  const standardSuggestion = standardString(suggestion);

  return creator.filter((creator) => {
    const firstName = standardString(creator.firstName);
    const lastName = standardString(creator.lastName);

    return (
      firstName.startsWith(standardSuggestion) ||
      lastName.startsWith(standardSuggestion)
    );
  });
};


