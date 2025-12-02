import { CopyButton } from '@/components/commons/CopyButton';
import Head from 'next/head';
import React, { useState } from 'react';

interface ContatosProps {
  contacts: {
    name: string;
    link: string;
    isMail?: boolean;
  }[];
}

const Contatos = ({ contacts }: ContatosProps) => {
  console.log(contacts);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_NETLIFY_FUNCTION_URL || '/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Or display a success message more gracefully
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        alert(data.message); // Or display an error message more gracefully
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Contacts | Luiz Antonio Comiran Bueno</title>
      </Head>
      <div className=" px-6 md:px-32 bg-h-blue-900 rounded-lg shadow-lg py-10">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-10">Contacts</h1>
        <ul className="flex flex-col items-center mx-auto max-w-md space-y-4">
          {contacts.map(({ link, name, isMail }, idx) => (
            <li key={name + idx} className="flex items-center gap-3 text-lg md:text-xl">
              <span>{isMail ? "📧" : "🔗"}</span>
              <a
                href={isMail ? `mailto:${link}` : link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-h-blue-400 transition-colors font-semibold underline"
              >
                {name}
              </a>
              {isMail && <CopyButton textToCopy={link} />}
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Send a Message</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="comiranbueno0@gmail.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-semibold mb-2">Message:</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-h-blue-500"
                placeholder="Your message..."
                required
              >
              </textarea>
            </div>
            <button
              type="submit"
              className="bg-h-blue-500 hover:bg-h-blue-600 text-white font-bold py-3 px-6 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const loadContacts = async () => {
  return [
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/luiz-antonio-comiran-bueno/",
    },
    {
      name: "GitHub",
      link: "https://github.com/Nastsukii",
    },
  ];
};

export const getStaticProps = async () => {
  const contacts = await loadContacts();

  return {
    props: {
      contacts,
    },
  };
};

export default Contatos;
