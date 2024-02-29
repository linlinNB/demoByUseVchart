const apiConfig = {
  'project.login': 'POST /maintain/login',
  'project.logout': 'GET /maintain/logout',
};

function getAPIByName(key) {
  const result = apiConfig[key];
  if (!result) {
    throw new Error(`没有找到${key}对应的URL`);
  }
  return result;
}

export { getAPIByName };
