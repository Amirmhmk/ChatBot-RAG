# Chatbot with LLM and RAG

This project is a chatbot application built with Next.js, utilizing Retrieval-Augmented Generation (RAG) for efficient question-answering. The backend is powered by a PostgreSQL database with a vector extension for enhanced data retrieval. A custom model from Ollama is used for both the generation and embedding phases.


https://github.com/user-attachments/assets/9a8d6639-3f0d-4290-9d1f-f7e8537ae433





This chatbot is implemented based on the guide provided by [Vercel's RAG Chatbot Documentation](https://sdk.vercel.ai/docs/guides/rag-chatbot). You can follow this guide as a reference for setting up and deploying a similar chatbot using RAG.

## Features
- RAG-based architecture for efficient and dynamic question answering.
- Custom model from Ollama for generation and embedding phases.
- Integration with OpenAI, Ollama AI, and Google APIs for enhanced language understanding.
- PostgreSQL database with vector extension for storing and retrieving data efficiently.
- Developed using the Next.js framework.

![image](https://github.com/user-attachments/assets/fed51458-434d-4891-a5b9-db12a52eacd1)


## Getting Started

### 1. Clone the repository
Clone this repository to your local machine:

```bash
git clone https://github.com/Amirmhmk/ChatBot-RAG.git
```

### 2. Install Dependencies
Install the necessary dependencies using `pnpm`:

```bash
pnpm install
```

### 3. Configure Environment
Edit the `.env` file and set up your PostgreSQL database connection:

```bash
# Example:
DATABASE_URL=postgres://username:password@localhost:5432/database_name
```

### 4. Prepare the Database
Run the following commands to set up your database:

```bash
pnpm db:migrate
pnpm db:push
```
![image](https://github.com/user-attachments/assets/06d9b688-f5c7-43e4-bb37-544cb3bf2ae4)


### 5. Install AI SDK Packages
Install the required packages for integration with OpenAI, Ollama AI, and Google:

```bash
pnpm add @ai-sdk/openai
pnpm add ollama-ai-provider
pnpm add @ai-sdk/google
pnpm add @ai-sdk/google
```

### 6. Use Custom Ollama Model for Generation and Embedding
The chatbot utilizes a custom model from Ollama for both the generation and embedding phases. Make sure to configure it appropriately in the project to ensure proper functionality.

### 7. Run the Project
Start the development server:

```bash
pnpm run dev
```

### 8. Access Your Database
To view and manage your database:

```bash
pnpm db:studio
```
![image](https://github.com/user-attachments/assets/07fcc280-9f06-4c75-a574-bf8887e6f996)



## Contributing
Feel free to fork this repository and submit pull requests if you'd like to contribute. Any suggestions or improvements are welcome!

## License
This project is open-source and available under the MIT License.
