import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  urlForFindAll(modelName, snapshot) {
    const path = this.pathForType(modelName);
    return `/content/${snapshot.adapterOptions.version}/${path}.json`;
  },

  urlForFindRecord(id, modelName, snapshot) {
    return `/content/${snapshot.adapterOptions.version}/${id}.json`;
  },

  buildURL(modelName, id, snapshot, requestType, query) {
    if (requestType !== 'query' || modelName !== 'page') {
      return this._super(...arguments);
    }

    let url = ['content', query.version, 'pages.json'];

    let host = this.host;
    let prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  },
});
