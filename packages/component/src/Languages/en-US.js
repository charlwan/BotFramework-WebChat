function xMinutesAgo(date) {
  const now = Date.now();
  const deltaInMs = now - new Date(date).getTime();
  const deltaInMinutes = Math.floor(deltaInMs / 60000);
  const deltaInHours = Math.floor(deltaInMs / 3600000);

  if (deltaInMinutes < 1) {
    return 'Just now';
  } else if (deltaInMinutes === 1) {
    return 'A minute ago';
  } else if (deltaInHours < 1) {
    return `${ deltaInMinutes } minutes ago`;
  } else if (deltaInHours === 1) {
    return `An hour ago`;
  } else if (deltaInHours < 5) {
    return `${ deltaInHours } hours ago`;
  } else if (deltaInHours <= 24) {
    return `Today`;
  } else if (deltaInHours <= 48) {
    return `Yesterday`;
  } else {
    return new Intl.DateTimeFormat('en-US').format(date);
  }
}

export default {
  'X minutes ago': xMinutesAgo,
  ...[
    'Type your message'
  ].reduce((result, text) => ({
    ...result,
    [text]: text
  }), {})
}
