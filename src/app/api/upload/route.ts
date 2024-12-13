import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 파일 이름을 타임스탬프로 생성
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), 'public/images', filename);

    // 파일 저장
    await writeFile(filepath, buffer);

    return NextResponse.json({ 
      message: "File uploaded successfully",
      url: `/images/${filename}` 
    });

  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
} 