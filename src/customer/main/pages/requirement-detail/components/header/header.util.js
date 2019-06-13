import { styles } from './header.style';

export const customizeHeader = (isAvailable, findingDriver) => {
  let style = {};

  if (isAvailable) {
    style = findingDriver ? styles.pendingHeader : styles.header;
  } else {
    style = styles.historyHeader;
  }

  return style;
};