const validate = values => {

    const error = {}

    if (!values.objects || !values.objects.length) {
        error.objects = { _error: 'At least one object must be entered' }
    } else {
        const objectArrayErrors = []
        values.objects.forEach((object, objectIndex) => {

            const objectErrors = { _error: 'Object Key should be unique' }
            if (values.objects.filter(item => item.key == object.key).length >= 2) {
                objectArrayErrors[objectIndex] = objectErrors
            }
        })
        if (objectArrayErrors.length) {
            error.objects = objectArrayErrors
        }
    }
    console.log(error)
    return error
}

export default validate