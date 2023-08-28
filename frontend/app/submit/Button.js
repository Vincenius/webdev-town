'use client'

import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '@mantine/core';

const SubmitButton = () => {
    const { pending } = useFormStatus()
    return <Button type="submit" loading={pending}>Submit</Button>
}

export default SubmitButton
