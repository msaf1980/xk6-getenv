import getenv from "k6/x/getenv";
import { check } from 'k6';

export let options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate=1'],
    },
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


    let UNDEF_STRING = getenv.getString(`${__ENV.UNDEF_STRING}`, "empty");
    console.log("UNDEF_STRING=" + UNDEF_STRING);
    check(UNDEF_STRING, {
        'UNDEF_STRING=empty': (r) => r == "empty",
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
    console.log("ENV_NUM=" + ENV_NUM); // NUM=22
    check(ENV_NUM, {
        'ENV_NUM=22': (r) => r == 22,
    });

    let UNDEF_NUM = getenv.getInt(`${__ENV.UNDEF_NUM}`, 10);
    console.log("UNDEF_NUM=" + UNDEF_NUM);
    check(UNDEF_NUM, {
        'UNDEF_NUM=10': (r) => r == 10,
    });

    let VAR_NUM = getenv.getInt(`${__ENV.VAR_NUM}`, 10);
    console.log("VAR_NUM=" + VAR_NUM);
    check(VAR_NUM, {
        'VAR_NUM=33': (r) => r == 33,
    });

    let NOT_RAND_NUM = getenv.getEnvIntRand("ENV_NUM", 10)
    console.log("NOT_RUND_NUM=" + NOT_RAND_NUM); // NUM=22
    check(NOT_RAND_NUM, {
        'NOT_RUND_NUM=22': (r) => r == 22,
    });

    let RAND_NUM = getenv.getIntRand('100:200', 10);
    console.log("RAND_NUM=" + RAND_NUM);
    check(RAND_NUM, {
        'RAND_NUM in range (100:200)': (r) => r >= 100 && r < 200,
    });
    
    console.log("NOT_NUM must failed");
    let NOT_NUM = getenv.getInt(`${__ENV.VAR_STRING}`, 10);
}
