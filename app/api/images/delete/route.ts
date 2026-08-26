import { NextResponse } from "next/server";

interface DeleteImageResponse {
  success: boolean;
  message: string;
}

export async function DELETE(request: Request) {
  try {
    const { images, token } = await request.json();

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No images provided",
        },
        {
          status: 400,
        }
      );
    }

    const headers = new Headers();

    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    }

    const apiKey = process.env.IMAGE_SERVER_API_KEY;

    if (apiKey) {
      headers.append("x-api-key", apiKey);
    }

    const results: DeleteImageResponse[] = [];

    for (const img of images) {
      const imgName = img.split("/").pop();

      if (!imgName) {
        throw new Error(`Invalid image URL: ${img}`);
      }

      const response = await fetch(
        `${process.env.IMAGE_SERVER_URL}/api/images/stordial/businesses/${imgName}`,
        {
          method: "DELETE",
          headers,
        }
      );

      const data: DeleteImageResponse = await response.json();

      console.log("Image Server Delete Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete image");
      }

      results.push(data);
    }

    return NextResponse.json({
      success: true,
      message: "Images deleted successfully",
      results,
    });
  } catch (err: unknown) {
    console.error("Delete images error:", err);

    return NextResponse.json(
      {
        success: false,
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}