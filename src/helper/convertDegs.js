export default function convertDegs(deg, toFarenheit = true) {
    if(toFarenheit) {
        return deg * 9 / 5 + 32;
    }
}