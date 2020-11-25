module.exports = {
    "error": (error) => {
        console.log("[SYS-ERR]: " + error);
    },
    "warning": (warning) => {
        console.log("[SYS-WARNING]: "+  warning)
    },
    "info": (info) => {
        console.log("[SYS-INFO]: " + info);
    }
}