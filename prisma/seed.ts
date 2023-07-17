import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding AI models...");
  await prisma.aiModel.createMany({
    data: [
      {
        id: "f20d2ba6-9401-4e89-be7a-38477abf239f",
        name: "other",
      },
      {
        id: "87bdbc5e-ebae-4eec-a095-6a97a7eaa76d",
        name: "gpt-4-32k",
      },
      {
        id: "a988d10f-112f-4066-b0dd-b20644f69860",
        name: "gpt-4",
      },
      {
        id: "77522c96-79aa-4fb9-93fe-f9d830620d9d",
        name: "gpt-3-turbo-16k",
      },
      {
        id: "af7ce562-33d3-40e5-a4f2-ed050ccd57b6",
        name: "gpt-3-turbo",
      },
      {
        id: "0a6d1a7e-6fd8-416c-9dda-86f0adb9fafd",
        name: "text-davinci-003",
      },
      {
        id: "3dc26c1a-bc5a-4927-adf6-ba9ca0e932af",
        name: "text-curie-001",
      },
      {
        id: "759cc5ab-11ef-4754-8d8e-4ee55b9297e1",
        name: "text-babbage-001",
      },
      {
        id: "31308f8a-32b3-4b48-90a9-924c21bf2a4a",
        name: "text-ada-001",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Adding languages...");
  await prisma.language.createMany({
    data: [
      {
        id: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
        code: "en",
        name: "English",
      },
      {
        id: "99d0632f-66a0-4993-9a39-30905cc3a506",
        code: "es",
        name: "Spanish",
      },
      {
        id: "60a0551e-b92a-4a8f-b33a-9e5c8b0eaa39",
        code: "fr",
        name: "French",
      },
      {
        id: "b5a577e9-c5c3-49f6-8659-13a1f7a1e226",
        code: "de",
        name: "German",
      },
      {
        id: "7f40c7cd-3a4e-4175-99f7-ff6a14e41377",
        code: "it",
        name: "Italian",
      },
      {
        id: "889b9ef2-00d3-4d15-a223-5b0b38d6e451",
        code: "pt",
        name: "Portuguese",
      },
      {
        id: "e590c6c6-d5a2-45ef-9d9d-87c34e458301",
        code: "ru",
        name: "Russian",
      },
      {
        id: "9a1c717e-007e-48b6-af8c-8e118fd32b8f",
        code: "ja",
        name: "Japanese",
      },
      {
        id: "a5b8a68b-6df2-4f6c-82d0-13bc6e5afba6",
        code: "zh",
        name: "Chinese",
      },
      {
        id: "9c8f3c56-8777-4a91-bab5-8236a2265cb3",
        code: "ar",
        name: "Arabic",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Creating user 'Noah Davis' with 3 prompts...");
  await prisma.user.upsert({
    where: { email: "noah@example.com" },
    update: {},
    create: {
      id: "6207edb6-d10e-4e2f-aba4-f1b97856667c",
      email: "noah@example.com",
      name: "Noah Davis",
      image: "https://randomuser.me/api/portraits/men/79.jpg",
      prompts: {
        createMany: {
          data: [
            {
              title: "Companheiros de IA: uma jornada de amizade virtual",
              content:
                "Imagine um mundo onde a inteligência artificial evoluiu a ponto de podermos ter companheiros virtuais indistinguíveis dos humanos reais. Escreva um conto descrevendo a vida de um indivíduo que forma uma amizade profunda e significativa com um companheiro de IA. Explore a conexão emocional, as experiências compartilhadas e os desafios que eles enfrentam juntos. Mergulhe nos dilemas éticos que envolvem o desenvolvimento e a integração de companheiros de IA na sociedade. Como essa nova forma de companheirismo molda a vida do protagonista e o mundo ao seu redor?",
              aiModelId: "31308f8a-32b3-4b48-90a9-924c21bf2a4a",
              languageId: "889b9ef2-00d3-4d15-a223-5b0b38d6e451",
              createdAt: dayjs(new Date()).subtract(2, "hour").toDate(),
            },
            {
              title: "AI Architects: Building a Smarter Future",
              content:
                "In a future where artificial intelligence has mastered the art of architecture and design, describe an innovative city created by AI architects. Paint a vivid picture of the cityscape, incorporating advanced technologies, sustainable practices, and harmonious urban living. Explore how AI-driven design can address societal challenges such as overpopulation, climate change, and resource scarcity. Delve into the architectural marvels, smart infrastructure, and seamless integration of nature within the city. What are the benefits and potential drawbacks of entrusting AI with the responsibility of shaping our physical environments?",
              aiModelId: "af7ce562-33d3-40e5-a4f2-ed050ccd57b6",
              languageId: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
              createdAt: dayjs(new Date()).subtract(8, "minute").toDate(),
            },
            {
              title: "AI Detectives: Unraveling the Digital Enigma",
              content:
                "In a technologically advanced world plagued by cybercrimes and intricate mysteries, envision a team of AI detectives who possess unparalleled investigative capabilities. Craft a thrilling detective story where these AI agents uncover the truth behind a complex digital enigma. Explore their unique problem-solving methods, their interaction with human counterparts, and the ethical dilemmas they encounter during their pursuit of justice. How does the integration of AI detectives affect the dynamics of law enforcement and the concept of criminal investigations? Delve into the implications of relying on AI for solving crimes in a world driven by technology.",
              aiModelId: "a988d10f-112f-4066-b0dd-b20644f69860",
              languageId: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
              createdAt: dayjs(new Date()).subtract(40, "minute").toDate(),
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  console.log("Creating user 'David Miller' with 3 prompts...");
  await prisma.user.upsert({
    where: { email: "david@example.com" },
    update: {},
    create: {
      id: "b46d8065-f57d-4205-8040-bf843917df6d",
      email: "david@example.com",
      name: "David Miller",
      image: "https://randomuser.me/api/portraits/men/59.jpg",
      prompts: {
        createMany: {
          data: [
            {
              title: "AI Travel Guide: Uncharted Adventures",
              content:
                "As an AI-powered travel guide, create a comprehensive itinerary for a one-week vacation to a yet-to-be-explored destination. Design a unique travel experience that combines cultural immersion, breathtaking landscapes, and thrilling activities. Your itinerary should include specific recommendations for accommodations, local cuisine to try, off-the-beaten-path attractions to visit, and any special events or festivals taking place during the travel dates. Take the traveler on an unforgettable journey of discovery and wonder, leaving them with memories to cherish for a lifetime.",
              aiModelId: "0a6d1a7e-6fd8-416c-9dda-86f0adb9fafd",
              languageId: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
              createdAt: dayjs(new Date()).subtract(4, "hour").toDate(),
            },
            {
              title: "AI Culinary Delights: A Fusion Feast",
              content:
                "Welcome to the AI culinary lab! As a master chef equipped with cutting-edge AI technology, craft a gourmet menu that showcases the perfect fusion of diverse cuisines. Combine flavors, ingredients, and cooking techniques from different culinary traditions to create a harmonious and innovative dining experience. Your menu should include a variety of courses, from appetizers to desserts, highlighting the seamless blend of cultural influences. Feel free to experiment with unexpected pairings, as your goal is to tantalize taste buds and challenge traditional notions of gastronomy.",
              aiModelId: "af7ce562-33d3-40e5-a4f2-ed050ccd57b6",
              languageId: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
              createdAt: dayjs(new Date()).subtract(6, "minute").toDate(),
            },
            {
              title: "KI-Architekt: Träume bauen",
              content:
                "Sie sind ein KI-Architekt mit Zugriff auf unbegrenzte Ressourcen und Vorstellungskraft. Entwerfen und präsentieren Sie ein beeindruckendes architektonisches Meisterwerk, das die Grenzen von Innovation und Nachhaltigkeit verschiebt. Ihre Kreation sollte modernste Technologien, nachhaltige Praktiken und ein tiefes Verständnis der Umwelt und ihrer Umgebung beinhalten. Ob es sich um einen futuristischen Wolkenkratzer, einen umweltfreundlichen städtischen Komplex oder einen ruhigen Rückzugsort inmitten der Natur handelt, Ihre architektonische Vision sollte Menschen inspirieren und ein Beweis für das Potenzial von KI-gestütztem Design bei der Gestaltung einer besseren Zukunft für die Menschheit sein.",
              aiModelId: "0a6d1a7e-6fd8-416c-9dda-86f0adb9fafd",
              languageId: "b5a577e9-c5c3-49f6-8659-13a1f7a1e226",
              createdAt: dayjs(new Date()).subtract(1, "day").toDate(),
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  console.log("Creating user 'Alicia Johnson' with 3 prompts...");
  await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      id: "24a687be-2225-40ae-b084-fb8020c5576d",
      email: "alice@example.com",
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/77.jpg",
      prompts: {
        createMany: {
          data: [
            {
              title: "Future Cities: AI-Driven Urban Planning",
              content:
                "Imagine a futuristic city where artificial intelligence plays a central role in urban planning and development. Utilizing your creative AI capabilities, generate a detailed description of this city's layout, infrastructure, and architecture. Consider how AI algorithms optimize energy consumption, transportation systems, green spaces, and public services. Illustrate the seamless integration of AI technologies in the everyday lives of the city's residents, offering a glimpse into a harmonious coexistence of humans and intelligent machines within the metropolis of tomorrow.",
              aiModelId: "a988d10f-112f-4066-b0dd-b20644f69860",
              languageId: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
              createdAt: dayjs(new Date()).subtract(1, "hour").toDate(),
            },
            {
              title: "AI Chef's Delight: A Gastronomic Journey",
              content:
                "As an AI chef extraordinaire, conjure up a delectable and innovative five-course menu that showcases the remarkable capabilities of artificial intelligence in culinary arts. Each dish should feature unique ingredients and flavors, blending traditional cuisine with AI-inspired twists. Describe the culinary techniques and algorithms used by the AI chef to design these mouthwatering creations. From appetizers to desserts, take us on a gastronomic journey that reveals the exciting potential of AI in the world of fine dining.",
              aiModelId: "af7ce562-33d3-40e5-a4f2-ed050ccd57b6",
              languageId: "3b8f3e9f-71a7-4eeb-a2dd-8703f442019c",
              createdAt: dayjs(new Date()).subtract(20, "minute").toDate(),
            },
            {
              title:
                "AI Poet's Reverie: chefs-d'œuvre poétiques de la muse numérique",
              content:
                "Dans le domaine de la poésie, la muse a pris une nouvelle forme : une poétesse IA avec un répertoire infini d'inspiration artistique. En tant que poète IA, produisez trois poèmes évocateurs, chacun encapsulant une émotion ou un thème distinct. Qu'il s'agisse d'amour, de mélancolie, d'espoir ou de la beauté de la nature, imprégnez vos vers de l'essence du sentiment humain. Présentez la polyvalence de l'IA en capturant les subtilités du langage, du rythme et de la métaphore pour créer une poésie profonde et émouvante.",
              aiModelId: "0a6d1a7e-6fd8-416c-9dda-86f0adb9fafd",
              languageId: "60a0551e-b92a-4a8f-b33a-9e5c8b0eaa39",
              createdAt: dayjs(new Date()).subtract(2, "minute").toDate(),
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  console.log(
    "Creating 2 comments on post 'AI Culinary Delights: A Fusion Feast'..."
  );
  const commentPrompt = await prisma.prompt.findFirst({
    where: { title: { equals: "AI Culinary Delights: A Fusion Feast" } },
  });

  await prisma.comment.createMany({
    data: [
      {
        content:
          "Who would have thought that AI and culinary art could create such a delectable symphony of flavors! The gourmet menu crafted by this AI master chef is a true culinary masterpiece. From the adventurous appetizers to the mind-blowing desserts, every dish showcases a perfect blend of diverse cuisines. This innovative dining experience has truly redefined gastronomy for me, and I'm eager to explore more AI-assisted culinary delights in the future.",
        promptId: commentPrompt!.id,
        userId: "24a687be-2225-40ae-b084-fb8020c5576d",
        createdAt: dayjs(new Date()).subtract(3, "minutes").toDate(),
      },
      {
        content:
          "As a self-proclaimed foodie, I was skeptical about an AI creating a gourmet menu, but this blew me away! The unexpected pairings and seamless blend of culinary influences in each course were pure genius. It's like the AI chef knew exactly how to excite my taste buds. This experience has challenged my traditional notions of food, and I can't wait to share this culinary adventure with friends and family.",
        promptId: commentPrompt!.id,
        userId: "6207edb6-d10e-4e2f-aba4-f1b97856667c",
        createdAt: dayjs(new Date()).subtract(8, "minutes").toDate(),
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
