import { NextResponse } from "next/server";

async function uploadImages({files,project,folder,token}: {files: File[], project: string, folder: string, token: string}) {

    const formData = new FormData();

    files.forEach(file => {
        formData.append("images", file);
    });

    const headers = new Headers();

    if (token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    const apiKey = process.env.IMAGE_SERVER_API_KEY;
    if (apiKey) {
        headers.append("x-api-key", apiKey);
    }

    const response = await fetch(
        `${process.env.IMAGE_SERVER_URL}/api/upload/${project}/${folder}`,
        {
            method: "POST",
            headers,
            body: formData
        }
    );

    const data = await response.json();
    console.log("Image Server Response : ", data);

    if (!response.ok) {

        throw new Error(data.message);

    }

    return data.images;

}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const files = formData
            .getAll("images")
            .filter((file): file is File => file instanceof File);

            console.log('Files : ', files);

        if (!files.length) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Please select images"
                },
                {
                    status: 400
                }
            );

        }

        if (files.length > 4) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Maximum 4 images allowed"
                },
                {
                    status: 400
                }
            );

        }

        const cookieHeader = request.headers.get("cookie") ?? "";
        const token = cookieHeader
            .split("; ")
            .find((c) => c.startsWith("token="))
            ?.split("=")[1];

        console.log("Token : ", token);


        const imageUrls = await uploadImages({
            files,
            project: "stordial",
            folder: "businesses",
            token: token || ""

        });

        console.log("Image URLs : ", imageUrls)

        return NextResponse.json({
            success: true,
            images: imageUrls

        });

    } catch (err: unknown) {
        return NextResponse.json(
        {
            success: false,
            message: err instanceof Error ? err.message : "Something went wrong",
        },
        {
            status: 500,
        }
        );
    }

}