const config = {
    Auth: 'http://90.156.218.15:5220/Auth/login',
    User: 'http://90.156.218.15:5220/User/getUserByUsername',
    Message: 'http://api/Message/send-message',
    deleteDialog: 'http://90.156.218.15:5220/Dialog/deleteDialog',
    getDialogsByOwnerId: 'http://90.156.218.15:5220/Dialog/getDialogsByOwnerId',
    ImageAgrigation: 'http://90.156.218.15:5220/ImageAgregation/generateImage',
    getImagesPage: "http://90.156.218.15:5220/ImageAgregation/getImagesPage/",
    getImagesZip: "http://90.156.218.15:5220/ImageAgregation/getSpecificImages",
    getPagesCount: "http://90.156.218.15:5220/ImageAgregation/getPagesCount",
    getImagesByKeyWords: "http://90.156.218.15:5220/ImageAgregation/getImagesByKeywords",
    getRoles: "http://90.156.218.15:5220/Roles/getRoles",
    getKeyWords: "http://90.156.218.15:5220/ImageAgregation/getUniqueKeyWords",
}

export default config;