import requests
from bs4 import BeautifulSoup

skills = ["python", "typescript", "javascript", "rust"]


class Scraper:

    def __init__(self):
        self.all_jobs = []
        self.base_url = "https://berlinstartupjobs.com"

    def add_jobs(self, company_name, title, description, url):
        job = {
            "company_name": company_name,
            "title": title,
            "description": description,
            "url": url
        }
        self.all_jobs.append(job)

    def scrape_jobs(self, url):
        print(f"Scraping page {url}...")
        response = requests.get(
            url,
            headers={
                "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            })

        soup = BeautifulSoup(response.content, "html.parser")
        jobs = soup.find("ul",
                         class_="jobs-list-items").find_all("li",
                                                            class_="bjs-jlid")
        for job in jobs:
            try:
                company_name = job.find("a", class_="bjs-jlid__b").text
                title = job.find("h4", class_="bjs-jlid__h").text
                description = job.find("div",
                                       class_="bjs-jlid__description").text
                url = job.find("a", class_="bjs-jlid__b")["href"]

                self.add_jobs(company_name, title, description, url)
            except AttributeError:
                pass

    def scrape_skills(self, skills):
        for skill in skills:
            self.scrape_jobs(f"{self.base_url}/skill-areas/{skill}/")

    def scrap_all_page(self):
        response = requests.get(
            f"{self.base_url}/engineering",
            headers={
                "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            })

        soup = BeautifulSoup(response.content, "html.parser")
        pages_length = len(
            soup.find("ul", class_="bsj-nav").find_all("a",
                                                       class_="page-numbers"))

        for index in range(pages_length):
            self.scrape_jobs(f"{self.base_url}/engineering/page/{index + 1}")


scraper = Scraper()

scraper.scrape_skills(skills)

scraper.scrap_all_page()

print(scraper.all_jobs)