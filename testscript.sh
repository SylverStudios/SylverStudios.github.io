base64 -i pdfSample.pdf | tr -d '\n' > pdf_base64.txt

# Create a JSON request file using the pdf_base64.txt content
jq -n --rawfile PDF_BASE64 pdf_base64.txt '{
    "model": "claude-opus-4-20250514",
    "max_tokens": 1024,
    "messages": [{
        "role": "user",
        "content": [{
            "type": "document",
            "source": {
                "type": "base64",
                "media_type": "application/pdf",
                "data": $PDF_BASE64
            }
        },
        {
            "type": "text",
            "text": "Give me a 1 sentence answer or less, what is a revenue value from this document?"
        }]
    }]
}' > request.json

# Send the API request using the JSON file
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d @request.json