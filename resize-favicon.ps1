Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\gabri\OneDrive\Desktop\alegrando-eventos-redesign (1)\assets\logo.png"
$img = [System.Drawing.Image]::FromFile($sourcePath)

function Resize-Image {
    param($width, $height, $outPath)
    $bmp = New-Object System.Drawing.Bitmap $width, $height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($img, 0, 0, $width, $height)
    $bmp.Save("c:\Users\gabri\OneDrive\Desktop\alegrando-eventos-redesign (1)\public\" + $outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Resize-Image 32 32 "favicon-32x32.png"
Resize-Image 16 16 "favicon-16x16.png"
Resize-Image 180 180 "apple-touch-icon.png"
Resize-Image 32 32 "favicon.ico"

$img.Dispose()
