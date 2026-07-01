export function compareObject(before: any, after: any) {

    const diff: Record<string, any> = {};

    Object.keys(after).forEach(key => {

        if (
            JSON.stringify(before[key]) !==
            JSON.stringify(after[key])
        ) {

            diff[key] = {
                before: before[key],
                after: after[key]
            };

        }

    });

    return diff;

}