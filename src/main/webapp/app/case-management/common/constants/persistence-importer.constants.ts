export const URLPATTERNWITHOUTPATH =
  // protocol identifier (optional)
  // short syntax // still required
  '(?:(?:(?:https?|HTTPS?):)?//)' +
  // user:pass BasicAuth (optional)
  '(?:S+(?::S*)?@)?' +
  // host & domain names, may end with dot
  // can be replaced by a shortest alternative
  '(?:' +
  '(?:' +
  '[a-zA-Z0-9\u00a1-\uffff]' +
  '[a-zA-Z0-9\u00a1-\uffff_-]{0,62}' +
  ')?' +
  '[a-zA-Z0-9\u00a1-\uffff].' +
  ')+' +
  // TLD identifier name, may end with dot
  '(?:[a-zA-Z\u00a1-\uffff]{2,}.?)' +
  // port number (optional)
  '(?::d{2,5})?' +
  // resource path (optional)

  '(?:[/?#]S*)?';

export const JIRAPERSISTENCEURLPATTERN = URLPATTERNWITHOUTPATH + '(?:/(browse|BROWSE))' + '((?<!([A-Z]{1,10})-?)[A-Z]+(-d+)?)';
