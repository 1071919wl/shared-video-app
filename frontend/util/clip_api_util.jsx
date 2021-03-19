export const fetchClip = (clipId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/clips/${clipId}`
    })
};

export const fetchClips = () => {
    return $.ajax({
        metod: 'GET',
        url: '/api/clips'
    })
}

export const postClip = (formData) => {
    return $.ajax({
        url: 'api/clips',
        method: "POST",
        data: formData,
        contentType: false,
        processData: false
    });
}