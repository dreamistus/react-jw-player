import { ReactJWPlayerProps } from '../types';

const getEventNameFromProp = (prop: string): keyof ReactJWPlayerProps | null => {
  const beginsWithOn = prop.slice(0, 2) === 'on';

  if (beginsWithOn) {
    const eventName = prop.slice(2);
    const [firstLetter, ...rest] = eventName;

    return `${ firstLetter.toLowerCase() }${ rest.join('') }` as keyof ReactJWPlayerProps;
  }

  return null;
};

export default getEventNameFromProp;
