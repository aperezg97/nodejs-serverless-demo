export interface SendGridOptions {
    to: string | string[],
    cc?: string | string[],
    bcc?: string | string[],
    from?: string,
    replyTo?: string,
    subject?: string,
    text?: string,
    html?: string,
    attachments?: AttachmentData[],
}

export interface AttachmentData {
    content: string;
    filename: string;
    type?: string;
    disposition?: string;
    contentId?: string;
}