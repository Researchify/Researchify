/**
 * ConditionalWrapper is a component that can be used to make tooltips appear conditionally.
 * For usage:
 * @see ImportSuccessPage.js 
 * @see Webpages.js
 */
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

export default ConditionalWrapper;