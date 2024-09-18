// Створюємо функцію, яка буде симулювати API виклик
export function fetchTemplate() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const template = {
          created_time: 1705415224642,
          preview_image: [],
          usecase: "crm",
          subject: "",
          modify_time: 1705487732505,
          body_format: "text",
          title: "TEST TEMPLATE1",
          req_vars: [
            {
              values: [],
              name: "Email Sender",
              require: true,
              id: "NzhxwIe2NEcMZQ7eYSiGl",
              key: "email_sender"
            },
            {
              values: [],
              name: "Email Sender 2",
              require: false,
              id: "NzhxwIe2NEcMZQ7eYSiGl",
              key: "email_sender"
            },
            // {
            //   values: [],
            //   name: "Email Sender 3",
            //   require: true,
            //   id: "NzhxwIe2NEcMZQ7eYSiGl",
            //   key: "email_sender"
            // },
            // {
            //   values: [],
            //   name: "Email Sender 4",
            //   require: true,
            //   id: "NzhxwIe2NEcMZQ7eYSiGl",
            //   key: "email_sender"
            // },
            // {
            //   values: [],
            //   name: "Email Sender 5",
            //   require: true,
            //   id: "NzhxwIe2NEcMZQ7eYSiGl",
            //   key: "email_sender"
            // },
          ],
          version: "0.2",
          whitelist_rules: [],
          msg_data: [],
          send_to: "",
          email_body: `<?xml version="1.0"?><catalog>
            <book id="bk101">
              <author>Gambardella, Matthew</author>
              <title>XML Developer's Guide</title>
              <genre>Computer</genre>
              <price>44.95</price>
              <publish_date>2000-10-01</publish_date>
              <description>An in-depth look at creating applications
              with XML.</description>
            </book>
            <book id="bk102">
              <author>Ralls, Kim</author>
              <title>Midnight Rain</title>
              <genre>Fantasy</genre>
              <price>5.95</price>
              <publish_date>2000-12-16</publish_date>
              <description>A former architect battles corporate zombies,
              an evil sorceress, and her own childhood to become queen
              of the world.</description>
            </book>
            <!-- Додаткові книги можна додати тут -->
          </catalog>`,
          design: `<?xml version="1.0"?>
            <catalog>
              <book id="bk101">
                <author>Gambardella, Matthew</author>
                <title>XML Developer's Guide</title>
                <genre>Computer</genre>
                <price>44.95</price>
                <publish_date>2000-10-01</publish_date>
                <description>An in-depth look at creating applications
                with XML.</description>
              </book>
              <!-- Додаткові книги можна додати тут -->
            </catalog>`,
          location: "londonderrydodge",
          id: "template_gW9fhX4eQhxE5MuvYgfRQ",
          src_type: "chat",
          template_images: []
        };
  
        resolve(template);
      }, 100); // Затримка для симуляції часу виконання запиту
    });
}
  