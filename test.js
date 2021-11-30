import getenv from "k6/x/getenv";
import { check } from 'k6';

export let options = {
    vus: 1,
    iterations: 1,
}

export default function() {
    // string checks

    let EMPTY_STRING = getenv.getEnv("EMPTY_STRING", "empty");
    console.log("EMPTY_STRING=" + EMPTY_STRING);
    check(EMPTY_STRING, {
        'EMPTY_STRING=empty': (r) => r == "empty",
    });

    let ENV_STRING = getenv.getEnv("ENV_STRING", "empty");
    console.log("ENV_STRING=" + ENV_STRING);
    check(ENV_STRING, {
        'ENV_STRING=value': (r) => r == "value",
    });

    let VAR_STRING = getenv.getString(`${__ENV.VAR_STRING}`, "empty");
    console.log("VAR_STRING=" + VAR_STRING);
    check(VAR_STRING, {
        'VAR_STRING=string': (r) => r == "string",
    });      

    // num checks

    let EMPTY_NUM = getenv.getEnvInt("EMPTY_NUM", 10)
    console.log("EMPTY_NUM=" + EMPTY_NUM);
    check(EMPTY_NUM, {
        'EMPTY_NUM=10': (r) => r == 10,
    });

    let ENV_NUM = getenv.getEnvInt("ENV_NUM", 10)
    console.log("ENV_NUM=" + getenv.getEnvInt("ENV_NUM", 10)); // NUM=22
    check(ENV_NUM, {
        'ENV_NUM=10': (r) => r == 22,
    });

    let VAR_NUM = getenv.getInt(`${__ENV.VAR_NUM}`, 10);
    console.log("VAR_NUM=" + VAR_NUM);
    check(VAR_NUM, {
        'VAR_NUM=33': (r) => r == 33,
    });
}
