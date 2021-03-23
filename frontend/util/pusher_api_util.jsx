export const auth = (cred) => {
    return $.ajax({
    method: 'POST',
    url: '/api/pusher/auth',
    data: { cred }
  })
};